
use crate::{
    app_state::AppState,
    models::password_reset::{PasswordResetCode},
};
use askama::Template;
use axum::response::IntoResponse;
use axum::{
    extract::State,
    routing::{get,post},
    Json, Router,
};
use chrono::{Datelike, Duration, Timelike, Utc, FixedOffset};
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use serde::{Deserialize, Serialize};
use std::{env};
use std::sync::Arc;
use time::{Date, Month, PrimitiveDateTime, Time};

#[derive(Deserialize)]
struct CodeRequest {
    to: String,
    subject: String,
}

#[derive(Template)]
#[template(path = "password_code.html")]
struct PasswordCodeTemplate {
    code: String,
    expires_at: String,
}

#[derive(Serialize)]
struct EmailResponse {
    status: i16,
    message: String,
}


use rand::Rng;
fn generate_verification_code() -> String {
    let code: u32 = rand::thread_rng().gen_range(10000..100000);
    code.to_string()
}

async fn send_password_code(
    State(app_state): State<Arc<AppState>>,
    Json(payload): Json<CodeRequest>,
) -> impl IntoResponse {
    let email_user = env::var("EMAIL_USER").expect("EMAIL_USER not set");
    let email_pass = env::var("EMAIL_PASS").expect("EMAIL_PASS not set");

    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(Credentials::new(
            email_user.to_string(),
            email_pass.to_string(),
        ))
        .build();

    let brasilia_offset = FixedOffset::west(3 * 3600); // UTC-3

    let minutes_time = 10;
    let verification_code: String = generate_verification_code();
    let now = Utc::now();
    let now = now + Duration::minutes(minutes_time);
    let year: i32 = now.year();
    let month_value = now.month();
    let day: u32 = now.day();
    let hours = now.time();
    let hour: u8 = hours.hour() as u8;
    let min: u8 = hours.minute() as u8;


    let seconds: u8 = hours.second() as u8;

    let month = match month_value {
        1 => Month::January,
        2 => Month::February,
        3 => Month::March,
        4 => Month::April,
        5 => Month::May,
        6 => Month::June,
        7 => Month::July,
        8 => Month::August,
        9 => Month::September,
        10 => Month::October,
        11 => Month::November,
        12 => Month::December,
        _ => unreachable!(),
    };

    let date = Date::from_calendar_date(year, month, day as u8).unwrap();
    let time = Time::from_hms(hour, min, seconds).unwrap();

    let expires_at = PrimitiveDateTime::new(date, time);

    let mut code = PasswordResetCode {
        id: None,
        email: payload.to.clone(),
        verification_code: generate_verification_code(),
        expires_at,
        created_at: None,
    };

    let template = PasswordCodeTemplate {
        code: verification_code,
        expires_at: expires_at.to_string(),
    };
    let rendered = template.render().unwrap();

    let email = Message::builder()
        .from("no-reply@guardameulanche.com".parse().unwrap())
        .to(payload.to.parse().unwrap())
        .subject(payload.subject)
        .header(lettre::message::header::ContentType::TEXT_HTML)
        .body(rendered)
        .unwrap();

    let _id = code.insert(&app_state.db_pool).await;

    match mailer.send(&email) {
        Ok(_) => {
            Json(EmailResponse {
                status: 200,
                message: "e-mail enviado com sucesso.".to_string(),
            })
        }
        Err(_) => {
            Json(EmailResponse {
                status: 500,
                message: "falha ao enviar o e-mail.".to_string(),
            })
        }
    }

}

pub fn create_router(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/", post(send_password_code))
        .with_state(app_state)
}

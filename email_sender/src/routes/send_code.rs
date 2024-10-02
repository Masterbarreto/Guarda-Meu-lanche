use askama::Template;
use axum::Json;
use axum::{
    routing::{get, post},
    Router,
};
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Deserialize)]
struct EmailRequest {
    to: String,
    subject: String,
    verification_code: String,
    name: String,
    url: String,
}

#[derive(Template)]
#[template(path = "verification_code.html")]
struct VerificationTemplate {
    verification_code: String,
    name: String,
    url: String,
}

async fn send_mail(Json(payload): Json<EmailRequest>) -> &'static str {
    let email_user = env::var("EMAIL_USER").expect("EMAIL_USER not set");
    let email_pass = env::var("EMAIL_PASS").expect("EMAIL_PASS not set");

    let template = VerificationTemplate {
        verification_code: payload.verification_code,
        name: payload.name,
        url: payload.url,
    };
    let rendered = template.render().unwrap();

    let email = Message::builder()
        .from("no-reply@guardameulanche.com".parse().unwrap())
        .to(payload.to.parse().unwrap())
        .subject(payload.subject)
        .header(lettre::message::header::ContentType::TEXT_HTML)
        .body(rendered)
        .unwrap();

    // Configurando o transporte SMTP
    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(Credentials::new(
            email_user.to_string(),
            email_pass.to_string(),
        ))
        .build();

    match mailer.send(&email) {
        Ok(_) => {
            println!("E-mail enviado com sucesso!");
            "E-mail enviado com sucesso!"
        }
        Err(e) => {
            println!("Erro ao enviar o e-mail: {:?}", e);
            "Falha ao enviar o e-mail."
        }
    }
}
pub fn create_router() -> Router {
    Router::new().route("/", post(send_mail))
}

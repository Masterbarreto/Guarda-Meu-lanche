use axum::{Router};

use crate::app_state::AppState;

pub mod send_code;
pub mod send_password_code;

pub fn create_router(app_state: std::sync::Arc<AppState>)-> Router {
    Router::new()
        .nest("/send_password_code", send_password_code::create_router(app_state.clone())) 
        .nest("/send_code", send_code::create_router(app_state.clone()))
        // .nest("/send_password_code", send_password_code::create_router(app_state)) // Usar clone do Arc<AppState>
        // .nest("/send_password_code", exemple_handler::create_router(app_state)) // Usar clone do Arc<AppState>
}

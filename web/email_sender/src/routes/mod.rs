pub mod send_code;

use axum::Router;

pub fn create_router() -> Router {
    Router::new().nest("/send_code", send_code::create_router())
}

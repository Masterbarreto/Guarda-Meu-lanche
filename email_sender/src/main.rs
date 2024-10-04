use std::net::SocketAddr;
use tokio;
mod routes;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let app = routes::create_router();

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("servidor rodando em http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

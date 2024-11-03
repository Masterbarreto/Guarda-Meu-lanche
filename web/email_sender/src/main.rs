use std::net::SocketAddr;
use sqlx::postgres::PgPoolOptions;
use tokio;
use dotenv::dotenv;
use std::env;
use std::sync::Arc;
mod routes; 
mod models;
mod app_state;
use app_state::AppState;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");

    let db_pool = match PgPoolOptions::new()
    .max_connections(5)
    .connect(&database_url).await {
        Ok(db_pool) => {
            println!("✅ Conexão com o banco de dados bem-sucedida!");
            db_pool
        }
        Err(err) => {
            println!("❌ Falha ao conectar ao banco de dados: {:?}", err);
            std::process::exit(1);
        }

    };

    let app_state = Arc::new(AppState { db_pool: db_pool.into() });

    let app = routes::create_router(app_state.clone());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Servidor rodando em http://{}", addr);
    
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

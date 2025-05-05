from flask import app
from app import create_app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

from app.routes.admin_dashboard import admin_bp

app.register_blueprint(admin_bp)

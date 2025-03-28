from flask import app
from app.routes import properties

app.register_blueprint(properties.bp)

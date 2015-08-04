from __future__ import absolute_import

from clay import app
from flask import Blueprint

televy_bp = Blueprint('televy', __name__, static_folder='../static/televy')


@app.route('/')
def televy():
    return "main hello world"

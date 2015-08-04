from __future__ import absolute_import

from clay import app

from flask.ext.assets import Environment

from televy.lib.json import AnalyticsJSONEncoder
from televy.controllers.televy_controller import televy_bp


app.json_encoder = AnalyticsJSONEncoder


@app.route('/health')
def health():
    return "OK"


app.register_blueprint(televy_bp)

assets = Environment(app)


if __name__ == "__main__":
    app.run(host='0.0.0.0')

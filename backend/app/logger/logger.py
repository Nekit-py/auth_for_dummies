import logging.config

import yaml

with open("app/logger/config.yml", "r") as stream:
    config = yaml.load(stream, Loader=yaml.FullLoader)

logging.config.dictConfig(config)

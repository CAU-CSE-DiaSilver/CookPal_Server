.PHONY: install

install:
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py
    python3 -m pip install requests
    python3 -m pip install bs4

.DEFAULT_GOAL := install

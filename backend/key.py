class key:
    com_key = "e1d2739c-fd29-4135-815a-801a44367663" # Needs to change maybe... Dynamic ?

    def check_key(client_key) -> bool:
        if key.com_key == client_key:
            return True
        else:
            return False

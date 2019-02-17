class key:
    __com_key = "e1d2739c-fd29-4135-815a-801a44367663" # TODO: Needs to change maybe... Dynamic ?

    def check_key(self, client_key) -> bool:
        if key.__com_key == client_key:
            return True
        else:
            return False

# The user account for a player, who has the option to host and play games
class Gamer:
    def __init__(self, name, email, password):
        self.set_name(name)
        self.set_email(email)
        self.set_password(password)

    # Get functions
    def get_name(self):
        return self.__name
    
    def get_email(self):
        return self.__email
    
    def get_password(self):
        return self.__password
    
    # Set functions
    def set_name(self, name):
        self.__name = name
    
    def set_email(self, email):
        self.__email = email
    
    def set_password(self, password):
        self.__password = password
    


# The user account for the owner of a pub, who would reserve tables for use in game nights
class Publican:
    def __init__(self, pubName, email, ID, password):
        self.set_pub_name(pubName)
        self.set_email(email)
        # ID is current placeholder for pub verification
        self.set_ID(ID)
        self.set_password(password)

    # Get functions
    def get_pub_name(self):
        return self.__pubName
    
    def get_email(self):
        return self.__email
    
    def get_ID(self):
        return self.__ID
    
    def get_password(self):
        return self.__password
    
    # Set functions
    def set_pub_name(self, pubName):
        self.__pubName = pubName
    
    def set_email(self, email):
        self.__email = email
    
    def set_ID(self, ID):
        self.__ID = ID
    
    def set_password(self, password):
        self.__password = password
    


class User < ApplicationRecord
    validates :username, 
        uniqueness: true, 
        length: { in: 3..30 }, 
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    # validates :email, 
    #     uniqueness: true, 
    #     length: { in: 3..255 }, 
    #     format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    attr_reader :password
    before_validation :ensure_session_token
    
    # def self.find_by_credentials(credential, password)
    #     user = User.find_by(username: credential)
    #     if user && user.is_password?(password)
    #         user
    #     else
    #         nil
    #     end
    # end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end
    

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
        self.session_token
    end
    
    private

    def ensure_session_token
        self.session_token ||= generate_session_token
    end


    def generate_session_token
        while true 
            session_token = SecureRandom.urlsafe_base64
            return session_token unless User.exists?(session_token: session_token)
        end
    end
end

class Comment < ApplicationRecord
    validates :body, :commenter_id, :pin_id, presence: true

    belongs_to :commenter, 
    foreign_key: :commenter_id,
    class_name: :User

    belongs_to :pin

end

# == Schema Information
#
# Table name: pins
#
#  id               :bigint           not null, primary key
#  title            :string           not null
#  description      :text
#  alt_text         :string
#  destination_link :string
#  user_id          :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Pin < ApplicationRecord
    validates :title, presence: true
    validate :ensure_photo

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :pinboards,
        dependent: :destroy

    has_many :boards,
        through: :pinboards


    has_one_attached :photo,
        dependent: :destroy

    def ensure_photo
        unless self.photo.attached?
            errors.add(:photo, "must be attached")
        end
    end
end

#pins can belong to many boards
#boards can have many pins


#pin-boards table 

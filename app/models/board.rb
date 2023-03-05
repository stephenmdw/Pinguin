# == Schema Information
#
# Table name: boards
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text
#  secret      :boolean
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Board < ApplicationRecord
    validates :title, :user_id, presence: true
    
    belongs_to :user

    has_many :pins,
        foreign_key: :board_id,
        class_name: :Pin,
        dependent: :destroy 


    has_many :pinboard,
        foreign_key: :board_id,
        class_name: :Pinboard

    has_many :pins, 
        through: :pinboard,
        source: :board
end

class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :secret
      t.references :user, foreign_key: true, null: false, index: true
      t.timestamps
    end
    create_table :pins do |t|
      t.references :board, foreign_key: true, index: true
      t.string :title, null: false
      t.text :description
      t.string :alt_text
      t.string :destination_link
      t.references :user, foreign_key: true, null: false, index: true
      t.timestamps
    end
    add_index :users, :username, unique: true
  end
end

#do I need line 12
#Should I add an index to :user :username, unique: true?
class CreatePinboards < ActiveRecord::Migration[7.0]
  def change
    create_table :pinboards do |t|
      t.references :board, foreign_key: true, null: false
      t.references :pin, foreign_key: true, null: false
      t.timestamps
    end
    add_index :pinboards, [:board_id, :pin_id], unique: true
  end
end

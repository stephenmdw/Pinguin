class ChangeComments < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :commenter_id_id, :commenter_id
  end
end

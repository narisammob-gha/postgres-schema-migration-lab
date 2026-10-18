
export const up = (pgm) => {
  pgm.createTable("customers", {
    id: "id",
    name: {
      type: "varchar(100)",
      notNull: true
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable("customers");
};

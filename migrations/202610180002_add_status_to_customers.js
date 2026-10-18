
export const up = (pgm) => {
  pgm.addColumn("customers", {
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "active"
    }
  });
};

export const down = (pgm) => {
  pgm.dropColumn("customers", "status");
};

const plan = (sequelize, DataTypes) => {
  const Plan = sequelize.define("plan", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    eventId: {
      type: DataTypes.STRING,
      unique: true
    },
    venueId: {
      type: DataTypes.STRING,
      unique: false
    },
    date: {
      type: DataTypes.DATE,
      unique: false
    }
  });

  Plan.associate = models => {
    Plan.belongsToMany(models.User, { through: "PlanUser" });
  };

  return Plan;
};

export default plan;

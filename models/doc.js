module.exports = (sequelize, Sequelize) => {
    return sequelize.define('doc', {
        id: {
            type: Sequelize.TEXT,
            primaryKey: true,
            autoIncrement: true,
        },
        // category: Sequelize.ENUM('Financial', 'Report format', 'Receives report email', 'etcetera'),
        title: Sequelize.STRING,
        origin: Sequelize.STRING,
        noteAssociated: Sequelize.BOOLEAN,
        // lastUpdate: Sequelize.DATETIME,
        lastUpdateUser: Sequelize.STRING,
        docPath: Sequelize.STRING,
    }
    );
}

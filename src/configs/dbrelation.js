const AssignModule = require('@/app/models/AssignModal');

const MasterModuleModal = require('@/app/models/MasterModuleModal');
const ModulesModal = require('@/app/models/ModuleModal');
const Session = require('@/app/models/SessionModal');
const User = require('@/app/models/UserModal');
const MasterModal = require("@/app/models/MasterModal.js");
const leads = require("@/app/models/Leads.js");
const Doctor = require('@/app/models/DoctorModal.js');
const HyperLocal = require('@/app/models/HyperLocal');
const TreatmentProcedure = require('@/app/models/TreatmentProcedure');
const HyperlocalBenifit = require('@/app/models/HyperlocalBenifit');
const ComprehensiveCare = require('@/app/models/ComprehensiveCare');
const HyperlocalCategory = require('@/app/models/HyperlocalCategory');
const DropUp = require('@/app/models/dropup');


// Assign Access User - Relation 
ModulesModal.hasMany(AssignModule, { foreignKey: 'assign_module_id', onDelete: 'CASCADE' });
AssignModule.belongsTo(ModulesModal, { foreignKey: 'assign_module_id', allowNull: false });

// Assign Table - Relations
User.hasMany(AssignModule, { foreignKey: 'assigner_id', onDelete: 'CASCADE' });
AssignModule.belongsTo(User, { foreignKey: 'assigner_id', allowNull: false });

User.hasMany(AssignModule, { foreignKey: 'user_id', onDelete: 'CASCADE' });
AssignModule.belongsTo(User, { foreignKey: 'user_id', allowNull: false });


leads.belongsTo(MasterModal, { foreignKey: 'areaId', as: "Area", allowNull: false });
DropUp.belongsTo(MasterModal, { foreignKey: 'areaId', as: "Area", allowNull: false });

// ALl User Complete Table Data
User.hasMany(Session, { onDelete: 'CASCADE' });
Session.belongsTo(User, { allowNull: false });


leads.belongsTo(Doctor, { foreignKey: 'doctorId', as: "Doctor", allowNull: false });
leads.belongsTo(MasterModal, { foreignKey: 'cityId', as: "City", allowNull: false });

DropUp.belongsTo(Doctor, { foreignKey: 'doctorId', as: "Doctor", allowNull: false });
DropUp.belongsTo(MasterModal, { foreignKey: 'cityId', as: "City", allowNull: false });

HyperLocal.hasMany(TreatmentProcedure, {
    foreignKey: 'hyperlocalId',
    onDelete: 'CASCADE', // Optional: Automatically delete treatment procedures if the department is deleted
});

// In your Department model file
HyperLocal.hasMany(TreatmentProcedure, { foreignKey: 'hyperlocalId' });

// In your TreatmentProcedure model file
TreatmentProcedure.belongsTo(HyperLocal, { foreignKey: 'hyperlocalId' });



HyperLocal.hasMany(HyperlocalBenifit, {
    foreignKey: 'hyperlocalId',
    onDelete: 'CASCADE', // Optional: Automatically delete treatment procedures if the department is deleted
});

// In your Department model file
HyperLocal.hasMany(HyperlocalBenifit, { foreignKey: 'hyperlocalId' });

// In your TreatmentProcedure model file
HyperlocalBenifit.belongsTo(HyperLocal, { foreignKey: 'hyperlocalId' });



HyperLocal.hasMany(ComprehensiveCare, {
    foreignKey: 'hyperlocalId',
    onDelete: 'CASCADE', // Optional: Automatically delete treatment procedures if the department is deleted
});

// In your Department model file
HyperLocal.hasMany(ComprehensiveCare, { foreignKey: 'hyperlocalId' });

// In your TreatmentProcedure model file
ComprehensiveCare.belongsTo(HyperLocal, { foreignKey: 'hyperlocalId' });


// models/HyperLocal.js
HyperLocal.belongsTo(HyperlocalCategory, {
    foreignKey: 'categoryId',
    as: 'category',
});

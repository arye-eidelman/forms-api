import FormTemplate from "./FormTemplate";
const models: {[key: string]: any} = { FormTemplate }


// associate models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate && typeof models[modelName].associate === "function") {
    models[modelName].associate(models);
  }
});

export default models;
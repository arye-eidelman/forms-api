import Form from "./Form";
const models: {[key: string]: any} = { Form }


// associate models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate && typeof models[modelName].associate === "function") {
    models[modelName].associate(models);
  }
});

export default models;
import mongoose, { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    heroName: {
      type: String,
      default: "Aman Verma",
    },

    heroRole: {
      type: String,
      default: "Aspiring Software Engineer",
    },

    heroDescription: {
      type: String,
      default:
        "Aspiring Software Engineer focused on Java Backend Development, Spring Boot, and Data Structures & Algorithms.",
    },

    heroFocus: {
      type: String,
      default: "Java Backend | Spring Boot | DSA",
    },

    heroStatus: {
      type: String,
      default: "Learning, Building, Improving",
    },

    heroMajor: {
      type: String,
      default: "B.Tech Information Technology",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    languages: {
      type: [String],
      default: ["English", "Hindi", "Tamil"],
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Settings || model("Settings", SettingsSchema);
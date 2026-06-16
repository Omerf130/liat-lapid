import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db";
import {
  defaultAdvantages,
  defaultPracticeAreas,
  defaultSiteSettings,
} from "../lib/defaults";
import AdminUser from "../models/AdminUser";
import SiteSettings from "../models/SiteSettings";
import PracticeArea from "../models/PracticeArea";
import Advantage from "../models/Advantage";

async function seed() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing. Add it to .env or .env.local");
    process.exit(1);
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      "❌ ADMIN_EMAIL and ADMIN_PASSWORD are required in .env or .env.local"
    );
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await connectDB();
  console.log("✓ Connected");

  const existingAdmin = await AdminUser.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`✓ Admin already exists: ${ADMIN_EMAIL}`);
  } else {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await AdminUser.create({ email: ADMIN_EMAIL, passwordHash });
    console.log(`✓ Admin created: ${ADMIN_EMAIL}`);
  }

  const existingSettings = await SiteSettings.findOne({ key: "main" });
  if (!existingSettings) {
    await SiteSettings.create({ key: "main", ...defaultSiteSettings });
    console.log("✓ Site settings seeded");
  } else {
    console.log("✓ Site settings already exist");
  }

  const practiceCount = await PracticeArea.countDocuments();
  if (practiceCount === 0) {
    await PracticeArea.insertMany(defaultPracticeAreas);
    console.log(`✓ Seeded ${defaultPracticeAreas.length} practice areas`);
  } else {
    console.log(`✓ Practice areas already exist (${practiceCount} documents)`);
  }

  const advantageCount = await Advantage.countDocuments();
  if (advantageCount === 0) {
    await Advantage.insertMany(defaultAdvantages);
    console.log(`✓ Seeded ${defaultAdvantages.length} advantages`);
  } else {
    console.log(`✓ Advantages already exist (${advantageCount} documents)`);
  }

  console.log("\n✅ Seed completed successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});

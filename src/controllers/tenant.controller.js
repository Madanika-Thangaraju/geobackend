// import Tenant from "../models/tenant.model.js";

// export async function registerTenant(req, res) {
//     console.log("👉 registerTenant controller hit");
//     console.log("👉 req.body:", req.body);
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !phone || !password) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const tenantId = await Tenant.create({
//       name,
//       email,
//       phone,
//       password
//     });

//     res.status(201).json({
//       success: true,
//       message: "Tenant registered successfully",
//       tenant_id: tenantId
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }


// export async function gettenants(req, res) {
//   console.log("👉 gettenants controller executed");

//   try {
//     const tenants = await Tenant.getAll();

//     res.status(200).json({
//       success: true,
//       count: tenants.length,
//       data: tenants
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

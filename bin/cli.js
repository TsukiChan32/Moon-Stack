#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Pobieramy nazwę projektu z komendy:
// create-moon-stack my-app
const projectName = process.argv[2]

// Jeśli użytkownik nie podał nazwy projektu
if (!projectName) {
  console.error("🌙 Please provide a project name.")
  console.error("")
  console.error("Example:")
  console.error("  create-moon-stack my-app")
  process.exit(1)
}

// Ustalamy, gdzie znajduje się nasze CLI
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Folder z template
const templateDir = path.resolve(__dirname, "../template")

// Folder, który chcemy utworzyć
const targetDir = path.resolve(process.cwd(), projectName)

// Nie nadpisujemy istniejącego folderu
if (fs.existsSync(targetDir)) {
  console.error(`❌ Directory "${projectName}" already exists.`)
  process.exit(1)
}

console.log("")
console.log(`🌙 Creating ${projectName}...`)
console.log("")

// Kopiujemy cały Moon Stack
fs.cpSync(templateDir, targetDir, {
  recursive: true,
})

// -------------------------------------
// package.json
// -------------------------------------

// Zmieniamy nazwę projektu w package.json
const packageJsonPath = path.join(targetDir, "package.json")

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf8")
  )

  packageJson.name = projectName

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  )
}

// -------------------------------------
// .env
// -------------------------------------

// Template zawiera tylko .env.example.
// W wygenerowanym projekcie tworzymy z niego lokalny .env.
const envExamplePath = path.join(targetDir, ".env.example")
const envPath = path.join(targetDir, ".env")

if (fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath)
}

// -------------------------------------
// Done!
// -------------------------------------

console.log(`✨ Moon Stack created successfully!`)
console.log("")
console.log("Next steps:")
console.log("")
console.log(`  cd ${projectName}`)
console.log("  npm install")
console.log("  npm run db:generate")
console.log("")
console.log("Start frontend:")
console.log("")
console.log("  npm run dev")
console.log("")
console.log("Start backend:")
console.log("")
console.log("  npm run server")
console.log("")
console.log("Database:")
console.log("")
console.log("  npm run db:migrate")
console.log("  npm run db:studio")
console.log("")
console.log("Happy hacking under the moon 🌙")
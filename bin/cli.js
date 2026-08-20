#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import spawn from "cross-spawn"
import * as p from "@clack/prompts"

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
    })

    let output = ""

    child.stdout.on("data", (data) => {
      output += data.toString()
    })

    child.stderr.on("data", (data) => {
      output += data.toString()
    })

    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(output))
      }
    })

    child.on("error", reject)
  })
}

p.intro("🌙 Create Moon Stack")

const projectName = await p.text({
  message: "Project name?",
  placeholder: "my-app",
})

if (p.isCancel(projectName)) {
  p.cancel("Moon Stack creation cancelled.")
  process.exit(0)
}

const installDependencies = await p.confirm({
  message: "Install dependencies?",
  initialValue: true,
})

if (p.isCancel(installDependencies)) {
  p.cancel("Moon Stack creation cancelled.")
  process.exit(0)
}

const initializeGit = await p.confirm({
  message: "Initialize Git repository?",
  initialValue: true,
})

if (p.isCancel(initializeGit)) {
  p.cancel("Moon Stack creation cancelled.")
  process.exit(0)
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
const gitignoreTemplatePath = path.join(targetDir, "gitignore")
const gitignorePath = path.join(targetDir, ".gitignore")

if (fs.existsSync(gitignoreTemplatePath)) {
  fs.renameSync(gitignoreTemplatePath, gitignorePath)
}

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

if (installDependencies) {
  const spinner = p.spinner()

  try {
    spinner.start("Installing dependencies")

    await runCommand("npm", ["install"], targetDir)

    spinner.stop("Dependencies installed")

    spinner.start("Generating Prisma Client")

    await runCommand("npm", ["run", "db:generate"], targetDir)

    spinner.stop("Prisma Client generated")
  } catch (error) {
    spinner.stop("Installation failed")

    console.error("")
    console.error(error.message)

    process.exit(1)
  }
}
if (initializeGit) {
  const spinner = p.spinner()

  spinner.start("Initializing Git repository")

  await runCommand("git", ["init"], targetDir)

  spinner.stop("Git repository initialized")
}



// -------------------------------------
// Done!
// -------------------------------------

console.log(`✨ Moon Stack created successfully!`)
console.log("")
console.log("Next steps:")
console.log("")

console.log(`  cd ${projectName}`)

if (!installDependencies) {
  console.log("  npm install")
  console.log("  npm run db:generate")
}

console.log("")
console.log("Start development:")
console.log("")
console.log("  npm run dev")
console.log("")
console.log("Database:")
console.log("")
console.log("  npm run db:migrate")
console.log("  npm run db:studio")
console.log("")
console.log("Happy hacking under the moon 🌙")

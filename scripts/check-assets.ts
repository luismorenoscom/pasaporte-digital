#!/usr/bin/env ts-node
/**
 * Script de validación de assets
 * Verifica que todas las referencias a assets en el código existan físicamente
 * y detecta problemas de case-sensitivity para deployment en Linux/Vercel
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Colores para la terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

interface AssetReference {
  file: string;
  line: number;
  path: string;
}

interface ValidationResult {
  missing: AssetReference[];
  caseIssues: AssetReference[];
  valid: AssetReference[];
}

/**
 * Busca recursivamente archivos en un directorio
 */
function findFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      if (!item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== 'dist') {
        files.push(...findFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Extrae referencias a assets de un archivo
 */
function extractAssetReferences(filePath: string): AssetReference[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const references: AssetReference[] = [];
  
  // Patrones para detectar assets
  const patterns = [
    // JSX/TSX: src="/path", href="/path", content="/path"
    /(src|href|content)=["']([^"']*\.(png|jpg|jpeg|webp|svg|gif|ico|mp4|webm|woff2?|ttf|otf))["']/gi,
    // CSS/Inline: url('/path') o url("/path")
    /url\(["']([^"')]*\.(png|jpg|jpeg|webp|svg|gif|ico|mp4|webm|woff2?|ttf|otf))["']\)/gi,
    // Import statements
    /import\s+.*\s+from\s+["']([^"']*\.(png|jpg|jpeg|webp|svg|gif|ico|mp4|webm|woff2?|ttf|otf))["']/gi,
  ];
  
  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        // El path puede estar en diferentes grupos según el patrón
        const assetPath = match[2] || match[1];
        if (assetPath && assetPath.startsWith('/')) {
          references.push({
            file: filePath,
            line: index + 1,
            path: assetPath,
          });
        }
      }
    });
  });
  
  return references;
}

/**
 * Verifica si un asset existe (case-sensitive)
 */
function checkAssetExists(assetPath: string, projectRoot: string): {
  exists: boolean;
  caseIssue: boolean;
  actualPath?: string;
} {
  const fullPath = path.join(projectRoot, 'public', assetPath.replace(/^\//, ''));
  
  // Verificar existencia exacta (case-sensitive)
  if (fs.existsSync(fullPath)) {
    return { exists: true, caseIssue: false };
  }
  
  // Buscar con case-insensitive para detectar problemas de case
  const dir = path.dirname(fullPath);
  const filename = path.basename(fullPath);
  
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const matchingFile = files.find(f => f.toLowerCase() === filename.toLowerCase());
    
    if (matchingFile && matchingFile !== filename) {
      return { 
        exists: false, 
        caseIssue: true, 
        actualPath: path.join(dir, matchingFile).replace(path.join(projectRoot, 'public'), '')
      };
    }
  }
  
  return { exists: false, caseIssue: false };
}

/**
 * Valida todas las referencias de assets
 */
function validateAssets(projectRoot: string): ValidationResult {
  console.log(`${colors.cyan}🔍 Buscando archivos fuente...${colors.reset}\n`);
  
  // Buscar archivos TypeScript/JavaScript/CSS
  const sourceFiles = [
    ...findFiles(path.join(projectRoot, 'src'), ['.ts', '.tsx', '.js', '.jsx', '.css']),
  ];
  
  console.log(`${colors.blue}📄 Analizando ${sourceFiles.length} archivos...${colors.reset}\n`);
  
  const allReferences: AssetReference[] = [];
  
  // Extraer referencias
  for (const file of sourceFiles) {
    const refs = extractAssetReferences(file);
    allReferences.push(...refs);
  }
  
  console.log(`${colors.magenta}🔗 Encontradas ${allReferences.length} referencias a assets${colors.reset}\n`);
  
  const result: ValidationResult = {
    missing: [],
    caseIssues: [],
    valid: [],
  };
  
  // Validar cada referencia
  const uniqueRefs = new Map<string, AssetReference>();
  allReferences.forEach(ref => {
    if (!uniqueRefs.has(ref.path)) {
      uniqueRefs.set(ref.path, ref);
    }
  });
  
  for (const [assetPath, ref] of uniqueRefs) {
    const check = checkAssetExists(assetPath, projectRoot);
    
    if (!check.exists && !check.caseIssue) {
      result.missing.push(ref);
    } else if (check.caseIssue) {
      result.caseIssues.push({ ...ref, path: `${ref.path} → ${check.actualPath}` });
    } else {
      result.valid.push(ref);
    }
  }
  
  return result;
}

/**
 * Imprime el reporte de validación
 */
function printReport(result: ValidationResult) {
  console.log(`\n${'='.repeat(80)}\n`);
  console.log(`${colors.cyan}📊 REPORTE DE VALIDACIÓN DE ASSETS${colors.reset}\n`);
  console.log(`${'='.repeat(80)}\n`);
  
  // Assets válidos
  console.log(`${colors.green}✅ Assets válidos: ${result.valid.length}${colors.reset}`);
  
  // Problemas de case
  if (result.caseIssues.length > 0) {
    console.log(`\n${colors.yellow}⚠️  Problemas de case-sensitivity: ${result.caseIssues.length}${colors.reset}`);
    console.log(`${colors.yellow}   (Funcionan en Windows pero FALLARÁN en Linux/Vercel)${colors.reset}\n`);
    
    result.caseIssues.forEach(ref => {
      console.log(`   ${colors.yellow}•${colors.reset} ${path.relative(process.cwd(), ref.file)}:${ref.line}`);
      console.log(`     ${ref.path}`);
    });
  }
  
  // Assets faltantes
  if (result.missing.length > 0) {
    console.log(`\n${colors.red}❌ Assets no encontrados: ${result.missing.length}${colors.reset}\n`);
    
    result.missing.forEach(ref => {
      console.log(`   ${colors.red}•${colors.reset} ${path.relative(process.cwd(), ref.file)}:${ref.line}`);
      console.log(`     ${ref.path}`);
    });
  }
  
  console.log(`\n${'='.repeat(80)}\n`);
  
  // Resumen final
  const hasIssues = result.missing.length > 0 || result.caseIssues.length > 0;
  
  if (!hasIssues) {
    console.log(`${colors.green}✨ ¡Todo perfecto! No se encontraron problemas con los assets.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}⚠️  Se encontraron ${result.missing.length + result.caseIssues.length} problema(s).${colors.reset}`);
    console.log(`${colors.yellow}   Por favor corrige estos problemas antes de hacer deploy a Vercel.${colors.reset}\n`);
    process.exit(1);
  }
}

// Ejecutar validación
const projectRoot = process.cwd();
console.log(`${colors.cyan}🚀 Validador de Assets - Pasaporte Digital${colors.reset}\n`);
console.log(`${colors.blue}📁 Proyecto: ${projectRoot}${colors.reset}\n`);

const result = validateAssets(projectRoot);
printReport(result);


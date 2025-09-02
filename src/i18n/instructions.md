# 🌍 Internationalization (i18n) Guide

This guide explains how to add new languages to the CV website. The project uses a unified i18n configuration system that keeps all language data, translations, and metadata in one place.


## 🚀 Adding a New Language

### 1. 📄 Create the CV Data File

### 2. 🔧 Update Astro Configuration

Add the new language to `astro.config.mjs`:

### 3. 🏗️ Update the i18n Configuration

Edit `src/i18n/config.ts` to include the new language:

#### 3.1 Import the new CV data

#### 3.2 Add to the i18nConfig object

### 4. 🎯 Create the New Page

Follow file based routing.

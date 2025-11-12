# Internationalization Implementation

## Overview
The construction management website now supports full internationalization (i18n) with three languages:
- **English (en)** - Default language
- **Spanish (es)** - Español
- **Russian (ru)** - Русский

## Implementation Details

### 1. Configuration
- **Module**: `@nuxtjs/i18n` configured in `nuxt.config.ts`
- **Strategy**: `prefix_except_default` (English URLs have no prefix, Spanish uses `/es/`, Russian uses `/ru/`)
- **Locale Files**: Located in `i18n/locales/`
  - `en.json` - English translations
  - `es.json` - Spanish translations
  - `ru.json` - Russian translations

### 2. Translation Structure
Each locale file contains the following sections:
- **nav**: Navigation menu items
- **hero**: Hero section (title, subtitle, CTA, stats)
- **about**: About section (company info, mission, values, CTA)
- **services**: Services section (4 service types with features)
- **contact**: Contact section (form fields, info cards)
- **footer**: Footer (company info, links, newsletter, legal)
- **admin**: Admin panel translations
- **common**: Common UI elements (buttons, actions)

### 3. Components Updated
The following components have been fully internationalized:

#### Header.vue
- Navigation links
- Login/Register buttons
- Integrated `LanguageSwitcher` component

#### Hero.vue
- Title and subtitle
- Description
- Call-to-action buttons
- Statistics (Projects, Clients, Experience)

#### About.vue
- Section title and subtitle
- Who We Are section
- Mission statement
- Core values (Quality, Innovation, Reliability, Safety)
- Call-to-action

#### Services.vue
- Section title and subtitle
- 4 service cards:
  - Residential Construction
  - Commercial Construction
  - Renovation & Remodeling
  - Project Management
- Feature lists for each service

#### Contacts.vue
- Section title and subtitle
- Contact information cards (Phone, Email, Address, Hours)
- Contact form fields:
  - First Name / Last Name
  - Email / Phone
  - Message
  - Submit button
- Privacy note

#### Footer.vue
- Company tagline
- Quick Links section
- Services section
- Contact Info section
- Newsletter signup
- Legal links (Privacy, Terms, Cookies)
- Copyright notice

### 4. Language Switcher
A dedicated `LanguageSwitcher.vue` component has been created:
- Dropdown select for language selection
- Displays language names in native format (English, Español, Русский)
- Automatically switches locale when selection changes
- Styled to match the site's design

### 5. URL Structure
- English (default): `https://yoursite.com/`
- Spanish: `https://yoursite.com/es/`
- Russian: `https://yoursite.com/ru/`

## Testing
To test the internationalization:

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test language switching**:
   - Use the language dropdown in the header
   - Navigate between languages
   - Verify all text changes appropriately

3. **Test URL routes**:
   - Visit `/` for English
   - Visit `/es/` for Spanish
   - Visit `/ru/` for Russian

4. **Verify translations**:
   - Check that all UI elements are translated
   - Ensure no missing translation keys
   - Verify proper formatting in all languages

## Adding New Translations

To add new translation keys:

1. Add the key to all three locale files (`en.json`, `es.json`, `ru.json`)
2. Use the `$t()` function in your component: `{{ $t('section.key') }}`
3. For placeholders in inputs: `:placeholder="$t('section.key')"`

Example:
```json
// en.json
{
  "newSection": {
    "title": "New Title"
  }
}

// es.json
{
  "newSection": {
    "title": "Nuevo Título"
  }
}

// ru.json
{
  "newSection": {
    "title": "Новый Заголовок"
  }
}
```

Then in your component:
```vue
<h2>{{ $t('newSection.title') }}</h2>
```

## Adding New Languages

To add a new language:

1. Create a new locale file in `i18n/locales/` (e.g., `fr.json` for French)
2. Copy the structure from `en.json` and translate all values
3. Add the locale to `nuxt.config.ts`:
   ```typescript
   {
     code: 'fr',
     iso: 'fr-FR',
     name: 'Français',
     file: 'fr.json'
   }
   ```
4. The language will automatically appear in the language switcher

## Best Practices

1. **Always use translation keys**: Never hardcode text in components
2. **Maintain consistency**: Keep the same structure across all locale files
3. **Use descriptive keys**: Make translation keys self-explanatory
4. **Test thoroughly**: Verify translations in all languages
5. **Keep translations updated**: When adding features, update all locale files

## Files Modified

- `nuxt.config.ts` - Added Russian locale
- `i18n/locales/en.json` - Complete English translations
- `i18n/locales/es.json` - Complete Spanish translations
- `i18n/locales/ru.json` - Complete Russian translations
- `app/components/LanguageSwitcher.vue` - New language switcher component
- `app/components/Header.vue` - Integrated language switcher and translations
- `app/components/Hero.vue` - Full i18n implementation
- `app/components/About.vue` - Full i18n implementation
- `app/components/Services.vue` - Full i18n implementation
- `app/components/Contacts.vue` - Full i18n implementation
- `app/components/Footer.vue` - Full i18n implementation

## Notes

- All translations are stored in JSON format for easy editing
- The language preference is stored in the user's browser
- SEO-friendly URLs with language prefixes
- Automatic locale detection can be enabled if needed
- Forms and validation messages are also translated

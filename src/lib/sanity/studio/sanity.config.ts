import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import {env} from '$env/dynamic/public';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure/deskStructure';

let {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = env;

let projectId = PUBLIC_SANITY_PROJECT_ID;
let dataset = PUBLIC_SANITY_DATASET;

export default defineConfig({
  name: 'mboa-sports',
  title: 'MBOA Sports — Content Studio',
  basePath: '/studio', // must match the catch-all route below
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        // Computed at runtime so this works identically on localhost,
        // staging, and production without extra env plumbing.
        origin: typeof window !== 'undefined' ? window.location.origin : '',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable'
        }
      }
    }),
    // GROQ playground — invaluable for testing queries while building.
    // Safe to remove for production if you want a leaner Studio bundle.
    visionTool()
  ]
});

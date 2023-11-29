'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from './theme';

export function NextAppDirEmotionCacheProvider(props) {
    const { options, CacheProvider = DefaultCacheProvider, children } = props;
  
    const [registry] = React.useState(() => {
      const cache = createCache(options);
      cache.compat = true;
      const prevInsert = cache.insert;
      let inserted = [];
      cache.insert = (...args) => {
        const [selector, serialized] = args;
        if (cache.inserted[serialized.name] === undefined) {
          inserted.push({
            name: serialized.name,
            isGlobal: !selector,
          });
        }
        return prevInsert(...args);
      };
      const flush = () => {
        const prevInserted = inserted;
        inserted = [];
        return prevInserted;
      };
      return { cache, flush };
    });
  
    useServerInsertedHTML(() => {
      const inserted = registry.flush();
      if (inserted.length === 0) {
        return null;
      }
      let styles = '';
      let dataEmotionAttribute = registry.cache.key;
  
      const globals = [];
  
      inserted.forEach(({ name, isGlobal }) => {
        const style = registry.cache.inserted[name];
  
        if (typeof style !== 'boolean') {
          if (isGlobal) {
            globals.push({ name, style });
          } else {
            styles += style;
            dataEmotionAttribute += ` ${name}`;
          }
        }
      });
  
      return (
        <React.Fragment>
          {globals.map(({ name, style }) => (
            <style
              key={name}
              data-emotion={`${registry.cache.key}-global ${name}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style }}
            />
          ))}
          {styles && (
            <style
              data-emotion={dataEmotionAttribute}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: styles }}
            />
          )}
        </React.Fragment>
      );
    });
  
    return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
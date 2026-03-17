import { useMemo } from 'react';
import { Text, View } from 'react-native';

type ContentPart = { type: 'text' | 'bold' | 'code' | 'codeblock'; value: string };

type FormattedContentProps = {
  content: string;
};

function InlineFormattedText({ text }: { text: string }) {
  const parts = useMemo(() => {
    const result: { type: 'text' | 'bold' | 'code'; value: string }[] = [];
    const regex = /(\*\*[^*]+\*\*)|(`[^`]+`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      }

      const matchText = match[0];
      if (matchText.startsWith('**')) {
        result.push({ type: 'bold', value: matchText.slice(2, -2) });
      } else if (matchText.startsWith('`')) {
        result.push({ type: 'code', value: matchText.slice(1, -1) });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push({ type: 'text', value: text.slice(lastIndex) });
    }

    return result;
  }, [text]);

  return (
    <Text style={{ color: '#9BA1A6', fontSize: 14, lineHeight: 24 }}>
      {parts.map((part, index) => {
        if (part.type === 'bold') {
          return (
            <Text key={index} style={{ color: '#60A5FA', fontWeight: '700', fontSize: 14 }}>
              {part.value}
            </Text>
          );
        }
        if (part.type === 'code') {
          return (
            <Text
              key={index}
              style={{
                fontFamily: 'monospace',
                backgroundColor: '#1E293B',
                color: '#F472B6',
                fontSize: 12,
                paddingHorizontal: 4,
                borderRadius: 4,
              }}>
              {part.value}
            </Text>
          );
        }
        return <Text key={index}>{part.value}</Text>;
      })}
    </Text>
  );
}

export function FormattedContent({ content }: FormattedContentProps) {
  const parts = useMemo(() => {
    const result: ContentPart[] = [];
    const lines = content.split('\n');
    let currentBlock: string[] = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const isCodeLine = line.startsWith('  `') || (inCodeBlock && line.startsWith('  '));

      if (isCodeLine && line.includes('`')) {
        if (!inCodeBlock) {
          if (currentBlock.length > 0) {
            result.push({ type: 'text', value: currentBlock.join('\n') });
            currentBlock = [];
          }
          inCodeBlock = true;
        }
        currentBlock.push(line);
      } else if (inCodeBlock && line.trim() === '') {
        currentBlock.push(line);
      } else {
        if (inCodeBlock) {
          result.push({ type: 'codeblock', value: currentBlock.join('\n') });
          currentBlock = [];
          inCodeBlock = false;
        }
        currentBlock.push(line);
      }
    }

    if (currentBlock.length > 0) {
      result.push({ type: inCodeBlock ? 'codeblock' : 'text', value: currentBlock.join('\n') });
    }

    return result;
  }, [content]);

  return (
    <View style={{ gap: 8 }}>
      {parts.map((part, index) => {
        if (part.type === 'codeblock') {
          const code = part.value
            .split('\n')
            .map((line) => line.replace(/^\s*`/, '').replace(/`$/, ''))
            .join('\n')
            .trim();

          return (
            <View
              key={index}
              style={{
                backgroundColor: '#0A0C0E',
                borderRadius: 10,
                padding: 14,
                borderWidth: 1,
                borderColor: '#2D3748',
                marginVertical: 4,
              }}>
              <Text style={{ fontFamily: 'monospace', fontSize: 12, color: '#E2E8F0', lineHeight: 20 }}>{code}</Text>
            </View>
          );
        }

        return <InlineFormattedText key={index} text={part.value} />;
      })}
    </View>
  );
}

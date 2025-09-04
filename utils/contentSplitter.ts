// Utility to split HTML content for inserting components in the middle

export interface ContentSplit {
    firstHalf: string;
    secondHalf: string;
}

export function splitHtmlContent(htmlContent: string, splitRatio: number = 0.6): ContentSplit {
    if (!htmlContent || htmlContent.trim().length === 0) {
        return { firstHalf: '', secondHalf: '' };
    }

    
    const blockElementSplit = splitByBlockElements(htmlContent, splitRatio);
    if (blockElementSplit.secondHalf) {
        return blockElementSplit;
    }

    const wordCountSplit = splitByWordCount(htmlContent, splitRatio);
    if (wordCountSplit.secondHalf) {
        return wordCountSplit;
    }

    return { firstHalf: htmlContent, secondHalf: '' };
}

function splitByBlockElements(htmlContent: string, splitRatio: number): ContentSplit {
    const blockElements = [
        /<p[^>]*>.*?<\/p>/gi,
        /<h[1-6][^>]*>.*?<\/h[1-6]>/gi,
        /<blockquote[^>]*>.*?<\/blockquote>/gi,
        /<ul[^>]*>.*?<\/ul>/gi,
        /<ol[^>]*>.*?<\/ol>/gi,
        /<div[^>]*>.*?<\/div>/gi
    ];

    const allMatches: Array<{ match: string; index: number }> = [];

    blockElements.forEach(regex => {
        let match;
        while ((match = regex.exec(htmlContent)) !== null) {
            allMatches.push({
                match: match[0],
                index: match.index
            });
        }
    });

    allMatches.sort((a, b) => a.index - b.index);

    if (allMatches.length <= 2) {
        return { firstHalf: htmlContent, secondHalf: '' };
    }

    const splitIndex = Math.floor(allMatches.length * splitRatio);
    const splitElement = allMatches[splitIndex];

    if (!splitElement) {
        return { firstHalf: htmlContent, secondHalf: '' };
    }

    const firstHalf = htmlContent.substring(0, splitElement.index).trim();
    const secondHalf = htmlContent.substring(splitElement.index).trim();

    return { firstHalf, secondHalf };
}

function splitByWordCount(htmlContent: string, splitRatio: number): ContentSplit {
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = textContent.split(' ');
    
    if (words.length < 100) {
        return { firstHalf: htmlContent, secondHalf: '' };
    }

    const targetWordCount = Math.floor(words.length * splitRatio);
    const targetText = words.slice(0, targetWordCount).join(' ');

    const sentences = htmlContent.split(/[.!?]+/);
    let accumulatedText = '';
    let splitIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
        const sentenceText = sentences[i].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (accumulatedText.length + sentenceText.length > targetText.length) {
            splitIndex = i;
            break;
        }
        accumulatedText += sentenceText;
    }

    if (splitIndex === 0 || splitIndex >= sentences.length - 1) {
        return { firstHalf: htmlContent, secondHalf: '' };
    }

    const firstSentences = sentences.slice(0, splitIndex).join('.');
    const secondSentences = sentences.slice(splitIndex).join('.');

    return {
        firstHalf: firstSentences + (firstSentences.endsWith('.') ? '' : '.'),
        secondHalf: secondSentences
    };
}

export function splitByCharacterCount(htmlContent: string, splitRatio: number = 0.6): ContentSplit {
    const targetLength = Math.floor(htmlContent.length * splitRatio);
    
    let splitPosition = targetLength;
    
    while (splitPosition > 0 && htmlContent[splitPosition] !== '>') {
        splitPosition--;
    }
    
    if (splitPosition === 0) {
        splitPosition = targetLength;
        while (splitPosition < htmlContent.length && htmlContent[splitPosition] !== '>') {
            splitPosition++;
        }
        splitPosition++;
    } else {
        splitPosition++;
    }

    const firstHalf = htmlContent.substring(0, splitPosition).trim();
    const secondHalf = htmlContent.substring(splitPosition).trim();

    return { firstHalf, secondHalf };
}

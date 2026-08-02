<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import Heading from './blocks/Heading.svelte';
  import Paragraph from './blocks/Paragraph.svelte';
  import Blockquote from './blocks/Blockquote.svelte';
  import BulletList from './blocks/BulletList.svelte';
  import NumberList from './blocks/NumberList.svelte';
  import ListItem from './blocks/ListItem.svelte';
  import ImageBlock from './blocks/ImageBlock.svelte';
  import VideoEmbedBlock from './blocks/VideoEmbedBlock.svelte';
  import CalloutBlock from './blocks/CalloutBlock.svelte';
  import CtaBlock from './blocks/CtaBlock.svelte';
  import NewsletterBlock from './blocks/NewsletterBlock.svelte';
  import DividerBlock from './blocks/DividerBlock.svelte';
  import CodeBlock from './blocks/CodeBlock.svelte';
  import StatHighlight from './blocks/StatHighlight.svelte';
  import LinkMark from './marks/LinkMark.svelte';
  import HighlightMark from './marks/HighlightMark.svelte';

  let { value }: { value: any[] } = $props();
</script>

<div class="article-body">
  <PortableText
    {value}
    components={{
      block: {
        normal: Paragraph,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        blockquote: Blockquote
      },
      list: { bullet: BulletList, number: NumberList },
      listItem: { bullet: ListItem, number: ListItem },
      marks: { link: LinkMark, highlight: HighlightMark },
      types: {
        imageBlock: ImageBlock,
        videoEmbed: VideoEmbedBlock,
        calloutBlock: CalloutBlock,
        ctaBlock: CtaBlock,
        newsletterBlock: NewsletterBlock,
        dividerBlock: DividerBlock,
        codeBlock: CodeBlock,
        statHighlight: StatHighlight
      }
    }}
  />
</div>

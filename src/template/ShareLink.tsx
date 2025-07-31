import useCustomToast from '@/hooks/useCustomToast';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BlueskyIcon,
  BlueskyShareButton,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from 'react-share';


export function ShareLink({ url }: { url: string }) {
  const [shareUrl, setShareUrl] = useState(url);
  const { user } = useSelector((state: any) => state.auth);
  const [copySuccess, setCopySuccess] = useState(false);
  const toast = useCustomToast()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link successfully copied", "success")
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };
  const title = 'AB Narionhs';
  useEffect(() => {
    setShareUrl(`${url}/auth/signup?ref=${user.id}`)
  }, [])

  return (
    <Box>
      <Flex flexWrap={"wrap"} gap={4}>
        <div className="Demo__some-network">
          <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>

        </div>

        <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <XIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="Demo__some-network">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>

        <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        <div className="Demo__some-network">
          <VKShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <VKIcon size={32} round />
          </VKShareButton>


        </div>

        <div className="Demo__some-network">
          <OKShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <OKIcon size={32} round />
          </OKShareButton>


        </div>

        <div className="Demo__some-network">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button"
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>

        <div className="Demo__some-network">
          <GabShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={640}
            className="Demo__some-network__share-button"
          >
            <GabIcon size={32} round />
          </GabShareButton>
        </div>

        <div className="Demo__some-network">
          <TumblrShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TumblrIcon size={32} round />
          </TumblrShareButton>


        </div>

        <div className="Demo__some-network">
          <LivejournalShareButton
            url={shareUrl}
            title={title}
            description={shareUrl}
            className="Demo__some-network__share-button"
          >
            <LivejournalIcon size={32} round />
          </LivejournalShareButton>
        </div>

        <div className="Demo__some-network">
          <MailruShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <MailruIcon size={32} round />
          </MailruShareButton>
        </div>

        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>

        <div className="Demo__some-network">
          <ViberShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
            <ViberIcon size={32} round />
          </ViberShareButton>
        </div>

        <div className="Demo__some-network">
          <WorkplaceShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <WorkplaceIcon size={32} round />
          </WorkplaceShareButton>
        </div>

        <div className="Demo__some-network">
          <LineShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
            <LineIcon size={32} round />
          </LineShareButton>
        </div>

        <div className="Demo__some-network">
          <WeiboShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <WeiboIcon size={32} round />
          </WeiboShareButton>
        </div>

        <div className="Demo__some-network">
          <PocketShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <PocketIcon size={32} round />
          </PocketShareButton>
        </div>

        <div className="Demo__some-network">
          <InstapaperShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
        </div>


        <div className="Demo__some-network">
          <ThreadsShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <ThreadsIcon size={32} round />
          </ThreadsShareButton>
        </div>

        <div className="Demo__some-network">
          <BlueskyShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button"
          >
            <BlueskyIcon size={32} round />
          </BlueskyShareButton>
        </div>
      </Flex>
      <Center py="20px" justifyContent={"space-between"}>
        <Box noOfLines={1}>
          {shareUrl}
        </Box>
        <Button
          onClick={() => copyToClipboard(shareUrl)}
        >
          {copySuccess ? <CheckIcon /> : <CopyIcon color="green" />}
        </Button>
      </Center>
    </Box>
  );
}

export default ShareLink;
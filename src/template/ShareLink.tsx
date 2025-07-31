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
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
        <div className="Demo__some-network">
          <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
            <FacebookIcon size={40} round />
          </FacebookShareButton>

        </div>

        <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={40} round />
          </FacebookMessengerShareButton>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <XIcon size={40} round />
          </TwitterShareButton>
        </div>

        <div className="Demo__some-network">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </div>



        <div className="Demo__some-network">
          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>


        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={40} round />
          </EmailShareButton>
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
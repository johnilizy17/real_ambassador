import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Checkbox,
    Container,
    Flex,
    Heading,
    IconButton,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import ChangePassword from './ChangePassword';
import { COLORS } from '@/layout/Theme';
import SettingProfile from './SettingProfile';

interface SecurityPage {
    id: number;
    title: string;
    description: string;
    component: React.ReactNode;
    slug: string;
}

interface ActiveView {
    title: string;
    component: React.ReactNode;
    id?: number;
    slug?: string;
}

interface DefaultSettingsPageProps {
    setActiveView: (view: ActiveView) => void;
    pages: SecurityPage[];
}

export const DefaultSettingsPage: React.FC<DefaultSettingsPageProps> = ({
    setActiveView,
    pages,
}) => {
    return (
        <VStack w='full' align='stretch'>
            {pages.map((page) => {
                return (
                    <Flex
                        key={page.id}
                        align='center'
                        role='navigation'
                        cursor='pointer'
                        onClick={() => {
                            setActiveView({
                                title: page.title,
                                component: page.component,
                                id: page.id,
                                slug: page.slug,
                            });
                        }}
                    >
                        <Box mr='4' w='full' flex='1'>
                            <Heading mb='2' fontWeight='normal' fontSize='md'>
                                {page.title}
                            </Heading>
                            <Text fontSize='sm' color='gray.500'>
                                {page.description}
                            </Text>
                        </Box>
                        <Box>
                            <ChevronRightIcon
                                color='gray.500'
                                fontWeight='normal'
                                fontSize='2xl'
                            />
                        </Box>
                    </Flex>
                );
            })}
        </VStack>
    );
};

function SettingsBar() {
    const router = useRouter();
    const [activeView, setActiveView] = useState<ActiveView | null>(null);

    const pages: SecurityPage[] = [
        {
            id: 1,
            title: 'Two Factor Authentication',
            description:
                'Help protect your account from unauthorized access by requiring a second authentication method in addition to your G-AIMS password. You can choose a text message, authentication app, or security key.',
            component: <TwoFactorAuthentication />,
            slug: '2fa',
        },
        {
            id: 2,
            title: 'Change Password',
            description:
                'Use a unique password to login to your account instead of your G-AIMS password.',
            component: <ChangePassword onClose={() => setActiveView(null)} />,
            slug: 'change-password',
        },
        {
            id: 3,
            title: 'Profile',
            description:
                'Review privacy settings to control what information is visible and to whom. This can help ensure that personal information is only accessible to trusted contacts.',
            component: <SettingProfile />,
            slug: 'profile',
        }
    ];

    // Update state based on URL
    useEffect(() => {
        const { section } = router.query;
        if (section) {
            const foundPage = pages.find((page) => page.slug === section);
            if (foundPage) {
                setActiveView({
                    title: foundPage.title,
                    component: foundPage.component,
                    id: foundPage.id,
                    slug: foundPage.slug,
                });
            }
        }
    }, [router.query]);

    // Update URL when changing view
    const handleSetActiveView = (view: ActiveView | null) => {
        if (view) {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, tab: 'security', section: view.slug },
                },
                undefined,
                { shallow: true }
            );
        } else {
            // Remove section param when going back
            const { section, ...otherParams } = router.query;
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...otherParams, tab: 'security' },
                },
                undefined,
                { shallow: true }
            );
        }

        setActiveView(view);
    };

    return (
        <>
            <Flex
                px={['4', '4', '8']}
                py='4'
                w='full'
                borderBottomWidth='thin'
                align='center'
            >
                {activeView?.component && (
                    <ChevronLeftIcon
                        cursor='pointer'
                        role='button'
                        mr='2'
                        px='0'
                        fontSize='xl'
                        onClick={() => handleSetActiveView(null)}
                    />
                )}
                <Heading fontWeight='normal' fontSize='lg'>
                    {activeView?.title ?? 'Settings'}
                </Heading>
            </Flex>
            <Container px={['4', '4', '8']} py='8' w='full' mx='0'>
                {activeView?.component ?? (
                    <DefaultSettingsPage
                        setActiveView={handleSetActiveView}
                        pages={pages}
                    />
                )}
            </Container>
        </>
    );
}

export default SettingsBar;

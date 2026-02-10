import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    Center,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    useRadio,
    useRadioGroup,
    UseRadioProps,
} from '@chakra-ui/react';
import React from 'react';
import { CheckCircle2, User, Users, Briefcase } from 'lucide-react';
import { cashFormat } from '@/utils/cashformat';

function AccountTypeCard(props: UseRadioProps & { children: React.ReactNode; typeData: any }) {
    const { getInputProps, getRadioProps } = useRadio(props);
    const { typeData } = props;

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as='label' w="full">
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='2px'
                borderRadius='2xl'
                boxShadow='sm'
                bg="white"
                borderColor="gray.200"
                _checked={{
                    bg: typeData.id === 'agent' ? 'blue.50' : 'green.50',
                    borderColor: typeData.id === 'agent' ? 'blue.500' : 'green.500',
                    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.15)',
                }}
                _hover={{
                    borderColor: typeData.id === 'agent' ? 'blue.300' : 'green.300',
                    transform: 'translateY(-4px)',
                    boxShadow: 'lg',
                }}
                transition='all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                p={6}
                position="relative"
            >
                {props.isChecked && (
                    <Box position="absolute" top={4} right={4}>
                        <Icon as={CheckCircle2} color={typeData.id === 'agent' ? 'blue.500' : 'green.500'} boxSize={6} />
                    </Box>
                )}

                <VStack align="start" spacing={4}>
                    <Flex
                        bg={typeData.id === 'agent' ? 'blue.100' : 'green.100'}
                        borderRadius="xl"
                        p={3}
                        align="center"
                        justify="center"
                    >
                        <Icon as={typeData.icon} color={typeData.id === 'agent' ? 'blue.600' : 'green.600'} boxSize={7} />
                    </Flex>

                    <Box>
                        <HStack justify="space-between" mb={1}>
                            <Text fontSize="xl" fontWeight="900" color="gray.900" letterSpacing="tight">
                                {typeData.title}
                            </Text>
                            <Text fontSize="lg" fontWeight="900" color={typeData.id === 'agent' ? 'blue.600' : 'green.600'}>
                                {typeData.price === 0 ? 'FREE' : cashFormat(typeData.price)}
                            </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600" lineHeight="tall">
                            {typeData.description}
                        </Text>
                    </Box>

                    <VStack align="start" spacing={2} w="full" pt={2}>
                        <Text fontSize="xs" fontWeight="800" color="gray.400" textTransform="uppercase" letterSpacing="widest">
                            Commission Structure
                        </Text>
                        <HStack spacing={2} wrap="wrap">
                            {typeData.benefits.map((benefit: string, index: number) => (
                                <Box
                                    key={index}
                                    px={3}
                                    py={1}
                                    bg="gray.50"
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="gray.100"
                                >
                                    <Text fontSize="xs" fontWeight="700" color="gray.700">
                                        {benefit}
                                    </Text>
                                </Box>
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}

export default function StepAccountType({ data, setPage, setData }: any) {
    const accountTypes = [
        {
            id: 'agent',
            title: 'Agent Account',
            price: 25000,
            payment: 6,
            description: 'Professional tier for active representatives with full earning potential across all streams.',
            icon: Briefcase,
            benefits: ['40% Referrals', '40% Subscriptions', '10% Land Sales'],
            commissions: { referral: 40, subscription: 40, landSales: 10 }
        },
        {
            id: 'realtor',
            title: 'Realtor Account',
            price: 0,
            payment: 5,
            description: 'Starting tier for real estate enthusiasts focused on direct land sales and property marketing.',
            icon: User,
            benefits: ['10% Land Sales Only'],
            commissions: { referral: 0, subscription: 0, landSales: 10 }
        }
    ];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'accountType',
        defaultValue: data.accountType || '',
        onChange: (val) => {
            const selected = accountTypes.find(t => t.id === val);
            if (selected) {
                setData({
                    ...data,
                    accountType: val,
                    accountTypeFee: selected.price,
                    payment: selected.payment,
                    commissions: selected.commissions
                });
            }
        },
    });

    const group = getRootProps();

    return (
        <Center flexDir='column'>
            <Box
                w={['320px', '500px']}
                paddingLeft={['10px', '20px']}
                paddingRight={['10px', '20px']}
                pos='relative'
            >
                <Center
                    w='100px'
                    h='37px'
                    fontSize='14px'
                    borderRadius='34px'
                    color={COLORS.grey}
                    fontWeight='800'
                    float='right'
                    bg={'rgba(241, 245, 249, 1)'}
                >
                    Step 2 of 3
                </Center>
                <Box h='37' />
                <VStack spacing={2} mb={10} align="start">
                    <Text fontSize="3xl" fontWeight="900" color="gray.900" letterSpacing="tight">
                        Choose Account Type
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Select the account tier that best matches your business goals.
                    </Text>
                </VStack>

                <VStack {...group} spacing={6} align="stretch">
                    {accountTypes.map((type) => {
                        const radio = getRadioProps({ value: type.id });
                        return (
                            <AccountTypeCard key={type.id} {...radio} typeData={type} isChecked={data.accountType === type.id}>
                                {type.title}
                            </AccountTypeCard>
                        );
                    })}
                </VStack>

                <Flex justify="space-between" align="center" mt={12} gap={4}>
                    <Button
                        flex="1"
                        variant="outline"
                        borderColor="gray.200"
                        color="gray.600"
                        onClick={() => setPage(1)}
                        borderRadius="xl"
                        h="56px"
                        fontWeight="bold"
                        _hover={{ bg: 'gray.50' }}
                    >
                        Back
                    </Button>
                    <Button
                        flex="2"
                        colorScheme='blue'
                        bg={COLORS.blue}
                        onClick={() => setPage(3)}
                        isDisabled={!data.accountType}
                        borderRadius="xl"
                        h="56px"
                        fontWeight="bold"
                        fontSize="lg"
                        _hover={{ bg: 'blue.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.2s"
                    >
                        Continue
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}

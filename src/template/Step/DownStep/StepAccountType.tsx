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
import { CheckCircle2, User, Briefcase } from 'lucide-react';
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
                    boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.1)',
                }}
                _hover={{
                    borderColor: typeData.id === 'agent' ? 'blue.300' : 'green.300',
                    transform: 'translateY(-2px)',
                }}
                transition='all 0.2s'
                p={4}
                position="relative"
            >
                {props.isChecked && (
                    <Box position="absolute" top={3} right={3}>
                        <Icon as={CheckCircle2} color={typeData.id === 'agent' ? 'blue.500' : 'green.500'} boxSize={5} />
                    </Box>
                )}

                <VStack align="start" spacing={3}>
                    <Flex
                        bg={typeData.id === 'agent' ? 'blue.100' : 'green.100'}
                        borderRadius="lg"
                        p={2}
                        align="center"
                        justify="center"
                    >
                        <Icon as={typeData.icon} color={typeData.id === 'agent' ? 'blue.600' : 'green.600'} boxSize={5} />
                    </Flex>

                    <Box>
                        <HStack justify="space-between" mb={1}>
                            <Text fontSize="md" fontWeight="800" color="gray.900">
                                {typeData.title}
                            </Text>
                            <Text fontSize="md" fontWeight="800" color={typeData.id === 'agent' ? 'blue.600' : 'green.600'}>
                                {typeData.price === 0 ? 'FREE' : cashFormat(typeData.price)}
                            </Text>
                        </HStack>
                    </Box>

                    <VStack align="start" spacing={1} w="full">
                        <HStack spacing={2} wrap="wrap">
                            {typeData.benefits.map((benefit: string, index: number) => (
                                <Box
                                    key={index}
                                    px={2}
                                    py={0.5}
                                    bg="gray.50"
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="gray.100"
                                >
                                    <Text fontSize="10px" fontWeight="700" color="gray.600">
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
            payment: 5,
            icon: Briefcase,
            benefits: ['40% Referrals', '40% Subscriptions', '10% Land Sales'],
            commissions: { referral: 40, subscription: 40, landSales: 10 }
        },
        {
            id: 'realtor',
            title: 'Realtor Account',
            price: 0,
            payment: 4,
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
        <VStack spacing={6} align="stretch" w="full">
            <VStack {...group} spacing={4} align="stretch">
                {accountTypes.map((type) => {
                    const radio = getRadioProps({ value: type.id });
                    return (
                        <AccountTypeCard key={type.id} {...radio} typeData={type} isChecked={data.accountType === type.id}>
                            {type.title}
                        </AccountTypeCard>
                    );
                })}
            </VStack>

            <Flex justify="space-between" align="center" mt={4} gap={4}>
                <Button
                    flex="1"
                    variant="outline"
                    onClick={() => setPage(2)}
                    borderRadius="xl"
                    h="50px"
                    fontWeight="bold"
                >
                    Back
                </Button>
                <Button
                    flex="2"
                    bg="#0047AB"
                    color="white"
                    _hover={{ bg: "#003580" }}
                    onClick={() => setPage(4)}
                    isDisabled={!data.accountType}
                    borderRadius="xl"
                    h="50px"
                    fontWeight="bold"
                >
                    Continue
                </Button>
            </Flex>
        </VStack>
    );
}

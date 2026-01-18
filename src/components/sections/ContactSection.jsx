import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ContactSection() {
    const { toast } = useToast();
    const email = 'shyamganesh1005@gmail.com';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        toast({
            title: '✨ Email Copied!',
            description: 'The email address has been copied to your clipboard.',
        });
    };

    return (
        <div className="cosmic-panel p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 mb-6"
            >
                <Mail className="w-12 h-12 text-purple-400" />
                <h2
                    className="font-orbitron text-4xl font-bold text-white"
                    style={{
                        textShadow: '0 0 20px rgba(155, 89, 182, 0.5)'
                    }}
                >
                    Contact
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 mb-6 font-inter text-lg"
            >
                Ready to connect? Reach out through the cosmic channels
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
            >
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-purple-400/30">
                    <Mail className="w-6 h-6 text-purple-400" />
                    <span
                        className="font-inter text-lg text-white flex-1"
                        style={{
                            textShadow: '0 0 10px rgba(155, 89, 182, 0.3)'
                        }}
                    >
                        {email}
                    </span>
                    <Button
                        onClick={copyToClipboard}
                        size="sm"
                        className="cosmic-button"
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default ContactSection;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout';
import { Button, Input, Textarea } from '@/components/ui';
import { toast } from '@/components/ui/Toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('请填写所有必填项');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('消息已发送，我们会尽快与您联系！');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('发送失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920"
            alt="联系我们"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-6"
        >
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-4">
            联系我们
          </h1>
          <p className="text-xl text-gray-300">
            期待为您服务
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-semibold text-white mb-8">
                发送消息
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="您的姓名 *"
                    placeholder="请输入姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="联系电话"
                    type="tel"
                    placeholder="请输入电话"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <Input
                  label="电子邮箱 *"
                  type="email"
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  label="主题"
                  placeholder="请输入主题"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <Textarea
                  label="您的消息 *"
                  placeholder="请输入您想说的话..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  发送消息
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-semibold text-white mb-8">
                联系信息
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">餐厅地址</h4>
                    <p className="text-gray-400">
                      15 Avenue Montaigne<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">联系电话</h4>
                    <a
                      href="tel:+33142890000"
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      +33 1 42 89 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">电子邮箱</h4>
                    <a
                      href="mailto:contact@limperial-paris.com"
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      contact@limperial-paris.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">营业时间</h4>
                    <p className="text-gray-400">
                      午餐: 12:00 - 14:30<br />
                      晚餐: 19:00 - 22:30<br />
                      <span className="text-red-400">周一、周二休息</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <h3 className="text-xl font-display font-semibold text-white mb-4">
                  餐厅位置
                </h3>
                <div className="h-[250px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342688!2d2.30375515!3d48.8659335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20Montaigne%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="餐厅位置"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              常见问题
            </span>
            <h2 className="text-4xl font-display font-bold text-white">
              您可能想知道的
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '如何预订座位？',
                a: '您可以通过我们的网站在线预订，也可以致电 +33 1 42 89 00 00 进行预订。建议提前1-2周预订，尤其是周末和节假日。',
              },
              {
                q: '需要着正装吗？',
                a: '我们建议商务休闲或正装出席。请避免穿着运动服装、拖鞋等过于休闲的装扮。',
              },
              {
                q: '可以携带儿童吗？',
                a: '当然可以。我们为儿童提供特别菜单。8岁以下儿童可能需要支付半价套餐费用。',
              },
              {
                q: '有素食或特殊饮食选项吗？',
                a: '我们提供素食和无麸质选项。请在预订时告知您的特殊饮食需求，我们的厨师会为您准备合适的菜品。',
              },
              {
                q: '可以举办私人活动吗？',
                a: '当然可以。我们有多个私人包厢可供选择，最多可容纳50位宾客。请联系我们的活动策划团队了解更多。',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-primary border border-gray-800 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-lg font-display font-semibold text-white mb-3">
                  {item.q}
                </h3>
                <p className="text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

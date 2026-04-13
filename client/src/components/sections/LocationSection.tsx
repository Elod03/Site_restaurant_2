import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function LocationSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-accent text-sm uppercase tracking-[0.3em]">
                位置与时间
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-semibold text-white mb-8">
              莅临<span className="text-gradient">品鉴</span>
            </h2>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
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

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=15+Avenue+Montaigne+Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              在地图上查看
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342688!2d2.30375515!3d48.8659335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20Montaigne%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-accent/30 rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Navbar, Footer } from '@/components/layout';
import { motion } from 'framer-motion';
import { ChefHat, Award, Heart } from 'lucide-react';

const teamMembers = [
  {
    name: 'Jean-Pierre Dubois',
    role: '行政总厨',
    roleEn: 'Executive Chef',
    bio: '曾效力于多家米其林餐厅，拥有超过30年的烹饪经验，是法国新式料理的代表人物。',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
  },
  {
    name: 'Marie Laurent',
    role: '首席侍酒师',
    roleEn: 'Head Sommelier',
    bio: '持有法国侍酒师协会认证，精通全球各大产区的葡萄酒，为宾客提供完美的餐酒搭配建议。',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
  },
  {
    name: 'Pierre Gaultier',
    role: '糕点主厨',
    roleEn: 'Pastry Chef',
    bio: '以其创新的甜点艺术闻名，曾在多个国际甜点比赛中获奖，擅长将传统法式甜点与现代元素融合。',
    image: 'https://images.unsplash.com/photo-1583394293214-28ez1a1a62e5?w=400',
  },
  {
    name: 'Sophie Bernard',
    role: '服务总监',
    roleEn: 'Director of Service',
    bio: '致力于为宾客提供无可挑剔的服务体验，她的团队以其专业、细致的服务而著称。',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
  },
];

const timeline = [
  { year: '1952', event: '餐厅创立' },
  { year: '1968', event: '获得首颗米其林星' },
  { year: '1985', event: '晋升为米其林二星' },
  { year: '1995', event: '荣获米其林三星最高荣誉' },
  { year: '2010', event: 'Jean-Pierre Dubois 接任行政总厨' },
  { year: '2024', event: '连续30年保持三星评级' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920"
            alt="关于我们"
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
            关于我们
          </h1>
          <p className="text-xl text-gray-300">
            探索 L'Imperial 的传奇故事
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                  alt="餐厅历史"
                  className="w-full rounded-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-accent/30 rounded-lg -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
                我们的故事
              </span>
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                七十年的<span className="text-gradient">美食传承</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                L'Imperial 的故事始于1952年，当时年轻的厨师长 Édouard Imperial 在巴黎最负盛名的香榭丽舍大道开设了这家小餐馆。凭借着对美食的热爱和对品质的执着追求，餐厅很快便声名鹊起。
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                七十多年来，L'Imperial 始终坚持选用最优质的食材，由经验丰富的厨师团队精心烹制每一道菜品。从最初的米其林一星，到如今的米其林三星，L'Imperial 已经成为法国美食界的一个传奇。
              </p>
              <p className="text-gray-400 leading-relaxed">
                如今，在现任行政总厨 Jean-Pierre Dubois 的带领下，L'Imperial 继续保持着其卓越的品质和创新精神，为来自世界各地的美食爱好者提供无与伦比的用餐体验。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ChefHat, title: '卓越品质', desc: '只选用最优质、最新鲜的食材' },
              { icon: Heart, title: '匠心精神', desc: '每一道菜品都凝聚着大厨的心血' },
              { icon: Award, title: '追求完美', desc: '不断创新，为宾客带来惊喜' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 border border-gray-800 hover:border-accent/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              发展历程
            </span>
            <h2 className="text-4xl font-display font-bold text-white">
              我们的<span className="text-gradient">里程碑</span>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-transparent" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : ''}`}>
                  <div className={`inline-block p-6 bg-background-alt border border-gray-800 ${
                    index % 2 === 0 ? 'text-right' : ''
                  }`}>
                    <span className="text-3xl font-display font-bold text-accent block mb-2">
                      {item.year}
                    </span>
                    <p className="text-white">{item.event}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-primary" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              精英团队
            </span>
            <h2 className="text-4xl font-display font-bold text-white">
              我们的<span className="text-gradient">烹饪大师</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <span className="text-accent text-sm block mb-3">{member.role}</span>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

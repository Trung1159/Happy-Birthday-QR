'use client';

import { ChevronLeft, ChevronRight, Heart, Music2, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const wishes = [
  'Hôm nay không chỉ là ngày em thêm một tuổi, mà còn là ngày anh thấy biết ơn vì thế giới đã có em — một người dịu dàng, ấm áp và vô cùng đặc biệt.',
  'Cảm ơn em đã xuất hiện, mang đến những niềm vui rất nhỏ nhưng đủ làm mọi ngày bình thường trở nên đáng nhớ, và khiến trái tim anh luôn có một nơi để mong về.',
  'Anh mong tuổi mới sẽ đối xử với em thật dịu dàng; cho em đủ mạnh mẽ để đi qua những ngày khó khăn, đủ bình yên để tận hưởng hiện tại và đủ can đảm để theo đuổi mọi điều em mơ ước.',
  'Nếu có lúc em mệt mỏi hay hoài nghi chính mình, hãy nhớ rằng em không cần phải hoàn hảo để được yêu thương. Với anh, em luôn xứng đáng với những điều chân thành và tốt đẹp nhất.',
  'Anh không hứa mọi chặng đường phía trước đều dễ dàng, nhưng anh mong mình có thể ở bên để cùng em sẻ chia niềm vui, nắm tay em qua những ngày giông gió và lặng nghe cả những điều em chưa kịp nói.',
  'Chúc mừng sinh nhật, tình yêu của anh. Mong nụ cười luôn ở trên môi em, bình an luôn ở trong tim em, và mỗi ngày mới đều cho em thêm một lý do để tin rằng cuộc đời này thật đẹp.',
];

/** Timestamp (seconds) where the chorus begins — the most emotional part. */
const CHORUS_START = 60;
/** Target playback volume (0–1). Kept moderate so it won't overpower reading. */
const TARGET_VOLUME = 0.45;
/** Duration of the fade-in effect in milliseconds. */
const FADE_IN_MS = 2000;

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 9) * -1.3}s`,
  duration: `${9 + (index % 6) * 1.4}s`,
  size: `${10 + (index % 4) * 4}px`,
}));

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  /** Smoothly ramp volume from 0 → TARGET_VOLUME over FADE_IN_MS. */
  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const start = performance.now();
    audio.volume = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / FADE_IN_MS, 1);
      // Ease-out curve for a natural fade
      audio.volume = TARGET_VOLUME * (1 - (1 - progress) ** 2);
      if (progress < 1) fadeRef.current = requestAnimationFrame(tick);
    };
    fadeRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!opened || !autoAdvance || wishIndex >= wishes.length - 1) return;
    const timer = window.setTimeout(() => setWishIndex((value) => value + 1), 14000);
    return () => window.clearTimeout(timer);
  }, [opened, wishIndex, autoAdvance]);

  function goToWish(index: number) {
    setAutoAdvance(false);
    setWishIndex(Math.max(0, Math.min(wishes.length - 1, index)));
  }

  // Background music — "Ngày Hạnh Phúc" by Bằng Cường ft DJ Oxy
  useEffect(() => {
    if (!opened) return;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio('/bgm.mp3');
      audio.loop = true;
      audio.currentTime = CHORUS_START;
      audio.volume = 0;
      audioRef.current = audio;
    }

    if (muted) {
      audio.pause();
    } else {
      // Resume or start playing from the chorus
      const play = async () => {
        try {
          await audio!.play();
          fadeIn(audio!);
        } catch {
          // Autoplay blocked — will retry on next user interaction
        }
      };
      play();
    }

    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, [opened, muted, fadeIn]);

  return (
    <main className={`birthday-page ${opened ? 'is-open' : ''}`}>
      <div className="ambient" aria-hidden="true" />
      <div className="petals" aria-hidden="true">
        {petals.map((petal) => (
          <span key={petal.id} style={{ '--left': petal.left, '--delay': petal.delay, '--duration': petal.duration, '--size': petal.size } as React.CSSProperties} />
        ))}
      </div>

      <header className="topbar">
        <span className="brand-mark"><Heart size={15} fill="currentColor" /> Dành riêng cho em</span>
        {opened && (
          <button className="icon-button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Bật nhạc' : 'Tắt nhạc'}>
            {muted ? <Music2 size={18} /> : <Pause size={18} />}
          </button>
        )}
      </header>

      <section className="hero">
        {!opened ? (
          <button className="envelope" onClick={() => { setOpened(true); setWishIndex(0); setMuted(false); }} aria-label="Mở thiệp sinh nhật">
            <span className="envelope-back" />
            <span className="letter-preview">
              <Sparkles size={18} />
              <small>Một điều bất ngờ</small>
              <strong>chỉ dành cho em</strong>
            </span>
            <span className="envelope-front" />
            <span className="heart-seal"><Heart size={22} fill="currentColor" /></span>
          </button>
        ) : (
          <div className="message-card">
            <p className="eyebrow"><Sparkles size={14} /> Make a birthday wish</p>
            <h1><span>Happy Birthday</span><em>My Love</em></h1>
            <div className="wish-stage" aria-live={autoAdvance ? 'off' : 'polite'} aria-atomic="true">
              {wishes.map((wish, index) => (
                <p key={wish} aria-hidden={index !== wishIndex} className={index === wishIndex ? 'active' : index < wishIndex ? 'past' : ''}>{wish}</p>
              ))}
            </div>
            <div className="wish-navigation" aria-label="Điều hướng lời chúc">
              <button
                className="wish-arrow"
                onClick={() => goToWish(wishIndex - 1)}
                disabled={wishIndex === 0}
                aria-label="Lời chúc trước"
              >
                <ChevronLeft size={17} />
              </button>
              <div className="wish-dots">
                {wishes.map((_, index) => (
                  <button
                    key={index}
                    className={index === wishIndex ? 'active' : ''}
                    onClick={() => goToWish(index)}
                    aria-label={`Lời chúc ${index + 1}`}
                    aria-current={index === wishIndex ? 'step' : undefined}
                  />
                ))}
              </div>
              <button
                className="wish-arrow"
                onClick={() => goToWish(wishIndex + 1)}
                disabled={wishIndex === wishes.length - 1}
                aria-label="Lời chúc tiếp theo"
              >
                <ChevronRight size={17} />
              </button>
            </div>
            <Button variant="ghost" className="reading-toggle" onClick={() => setAutoAdvance((value) => !value)} disabled={wishIndex === wishes.length - 1} aria-pressed={!autoAdvance}>
              {autoAdvance ? 'Dừng lại để đọc chậm' : 'Tiếp tục chuyển lời chúc'}
            </Button>
            <div aria-hidden={wishIndex !== wishes.length - 1} className={`signature ${wishIndex === wishes.length - 1 ? 'visible' : ''}`}>
              <span>Và điều ước riêng của anh,</span>
              <strong>là được nhìn thấy em hạnh phúc — hôm nay và thật nhiều ngày sau nữa.</strong>
              <Heart size={18} fill="currentColor" />
            </div>
            <button className="replay" onClick={() => { setWishIndex(0); setAutoAdvance(true); }}><RotateCcw size={15} /> Xem lại lời chúc</button>
          </div>
        )}
      </section>

      <footer><span>Ngày đặc biệt của em</span><span className="footer-heart">♥</span><span>With all my love</span></footer>
    </main>
  );
}

// 파스텔톤 색상 코드 리스트
const PASTEL_COLORS = [
  '#A8D8EA', // 파스텔 블루
  '#B8E0D2', // 파스텔 민트 그린
  '#D6EAF8', // 파스텔 스카이 블루
  '#FFD6E8', // 파스텔 핑크
  '#FFE5F1', // 파스텔 로즈
  '#FFB6C1', // 라이트 핑크
  '#C8E6C9', // 파스텔 그린
  '#A5D6A7', // 라이트 그린
  '#B2DFDB', // 파스텔 틸
  '#FFF9C4', // 파스텔 옐로우
  '#FFF59D', // 라이트 옐로우
  '#FFECB3', // 파스텔 크림
  '#E1BEE7', // 파스텔 퍼플
  '#CE93D8', // 라이트 퍼플
  '#F3E5F5', // 파스텔 라벤더
  '#FFE0B2', // 파스텔 오렌지
  '#FFCCBC', // 라이트 오렌지
  '#FFD9B3', // 파스텔 피치
  '#B2F5EA', // 파스텔 민트
  '#A7F3D0', // 라이트 민트
  '#C5F4E0', // 파스텔 아쿠아
  '#E6D5F7', // 파스텔 라벤더
  '#D1C4E9', // 라이트 라벤더
  '#F0E6FF', // 파스텔 바이올렛
]

/**
 * 문자열을 받아서 파스텔톤 색상 코드를 반환하는 함수
 * 같은 입력은 항상 같은 출력을 보장합니다 (deterministic)
 * @param str - 색상을 결정할 문자열
 * @returns 파스텔톤 색상 코드 (hex)
 */
export function getPastelColor(str: string): string {
  // 간단한 해시 함수로 문자열을 숫자로 변환
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32bit 정수로 변환
  }

  // 음수를 양수로 변환하고 색상 리스트의 인덱스로 사용
  const index = Math.abs(hash) % PASTEL_COLORS.length
  return PASTEL_COLORS[index]
}

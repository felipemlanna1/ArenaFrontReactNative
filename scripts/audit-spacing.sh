#!/bin/bash
# Arena Design System - Spacing Audit Script
# Finds hardcoded spacing values and suggests ArenaSpacing token replacements

echo "🔍 Arena Spacing Audit - Scanning for violations..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_VIOLATIONS=0
MARGIN_VIOLATIONS=0
PADDING_VIOLATIONS=0
GAP_VIOLATIONS=0

# Temporary files for results
MARGIN_FILE=$(mktemp)
PADDING_FILE=$(mktemp)
GAP_FILE=$(mktemp)

# Function to suggest ArenaSpacing token based on pixel value
suggest_token() {
  case $1 in
    2) echo "ArenaSpacing.micro (2px)" ;;
    4) echo "ArenaSpacing.xs (4px)" ;;
    6) echo "ArenaSpacing.xxs (6px) - Use xs (4px) or sm (8px) instead" ;;
    8) echo "ArenaSpacing.sm (8px)" ;;
    10) echo "ArenaSpacing.xsm (10px) - Use sm (8px) or md (12px) instead" ;;
    12) echo "ArenaSpacing.md (12px)" ;;
    14) echo "ArenaSpacing.mdlg (14px) - Use md (12px) or lg (16px) instead" ;;
    16) echo "ArenaSpacing.lg (16px)" ;;
    18) echo "ArenaSpacing.lxl (18px) - Use lg (16px) or xl (20px) instead" ;;
    20) echo "ArenaSpacing.xl (20px)" ;;
    24) echo "ArenaSpacing['2xl'] (24px)" ;;
    28) echo "ArenaSpacing.xxl3 (28px) - Use 2xl (24px) or 3xl (32px) instead" ;;
    32) echo "ArenaSpacing['3xl'] (32px)" ;;
    40) echo "ArenaSpacing['4xl'] (40px)" ;;
    48) echo "ArenaSpacing['5xl'] (48px) - Use 4xl (40px) or custom" ;;
    *) echo "No exact token match - use closest: xs(4) sm(8) md(12) lg(16) xl(20) 2xl(24) 3xl(32) 4xl(40)" ;;
  esac
}

# Scan for margin violations
echo "${BLUE}📏 Scanning margin properties...${NC}"
grep -rn -E "(margin|marginTop|marginBottom|marginLeft|marginRight|marginHorizontal|marginVertical|marginStart|marginEnd):\s*[0-9]+" \
  src/ \
  --include="*.ts" \
  --include="*.tsx" \
  --exclude-dir=node_modules \
  | grep -v "ArenaSpacing" \
  | grep -v "arenaSpacing.ts" \
  | grep -v "// @spacing-exception" \
  > "$MARGIN_FILE"

MARGIN_VIOLATIONS=$(wc -l < "$MARGIN_FILE" | tr -d ' ')

# Scan for padding violations
echo "${BLUE}📐 Scanning padding properties...${NC}"
grep -rn -E "(padding|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingHorizontal|paddingVertical|paddingStart|paddingEnd):\s*[0-9]+" \
  src/ \
  --include="*.ts" \
  --include="*.tsx" \
  --exclude-dir=node_modules \
  | grep -v "ArenaSpacing" \
  | grep -v "arenaSpacing.ts" \
  | grep -v "// @spacing-exception" \
  > "$PADDING_FILE"

PADDING_VIOLATIONS=$(wc -l < "$PADDING_FILE" | tr -d ' ')

# Scan for gap violations
echo "${BLUE}📊 Scanning gap properties...${NC}"
grep -rn -E "gap:\s*[0-9]+" \
  src/ \
  --include="*.ts" \
  --include="*.tsx" \
  --exclude-dir=node_modules \
  | grep -v "ArenaSpacing" \
  | grep -v "arenaSpacing.ts" \
  | grep -v "// @spacing-exception" \
  > "$GAP_FILE"

GAP_VIOLATIONS=$(wc -l < "$GAP_FILE" | tr -d ' ')

TOTAL_VIOLATIONS=$((MARGIN_VIOLATIONS + PADDING_VIOLATIONS + GAP_VIOLATIONS))

# Display results
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${YELLOW}📊 AUDIT RESULTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "├── Margin violations:  ${RED}${MARGIN_VIOLATIONS}${NC}"
echo "├── Padding violations: ${RED}${PADDING_VIOLATIONS}${NC}"
echo "└── Gap violations:     ${RED}${GAP_VIOLATIONS}${NC}"
echo ""
echo "📍 Total violations: ${RED}${TOTAL_VIOLATIONS}${NC}"
echo ""

if [ $TOTAL_VIOLATIONS -eq 0 ]; then
  echo "${GREEN}✅ CONGRATULATIONS! 100% ArenaSpacing Token Compliance!${NC}"
  echo ""
  rm "$MARGIN_FILE" "$PADDING_FILE" "$GAP_FILE"
  exit 0
fi

# Show detailed violations with suggestions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${YELLOW}🔍 DETAILED VIOLATIONS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $MARGIN_VIOLATIONS -gt 0 ]; then
  echo "${RED}📏 MARGIN VIOLATIONS (${MARGIN_VIOLATIONS}):${NC}"
  echo ""

  while IFS= read -r line; do
    FILE=$(echo "$line" | cut -d: -f1)
    LINE_NUM=$(echo "$line" | cut -d: -f2)
    CONTENT=$(echo "$line" | cut -d: -f3-)

    # Extract pixel value
    PIXEL_VALUE=$(echo "$CONTENT" | grep -oE "[0-9]+" | head -1)
    SUGGESTED_TOKEN=$(suggest_token "$PIXEL_VALUE")

    echo "  ${BLUE}${FILE}:${LINE_NUM}${NC}"
    echo "    ${CONTENT}"
    echo "    ${GREEN}→ Suggested: ${SUGGESTED_TOKEN}${NC}"
    echo ""
  done < "$MARGIN_FILE"
fi

if [ $PADDING_VIOLATIONS -gt 0 ]; then
  echo "${RED}📐 PADDING VIOLATIONS (${PADDING_VIOLATIONS}):${NC}"
  echo ""

  while IFS= read -r line; do
    FILE=$(echo "$line" | cut -d: -f1)
    LINE_NUM=$(echo "$line" | cut -d: -f2)
    CONTENT=$(echo "$line" | cut -d: -f3-)

    # Extract pixel value
    PIXEL_VALUE=$(echo "$CONTENT" | grep -oE "[0-9]+" | head -1)
    SUGGESTED_TOKEN=$(suggest_token "$PIXEL_VALUE")

    echo "  ${BLUE}${FILE}:${LINE_NUM}${NC}"
    echo "    ${CONTENT}"
    echo "    ${GREEN}→ Suggested: ${SUGGESTED_TOKEN}${NC}"
    echo ""
  done < "$PADDING_FILE"
fi

if [ $GAP_VIOLATIONS -gt 0 ]; then
  echo "${RED}📊 GAP VIOLATIONS (${GAP_VIOLATIONS}):${NC}"
  echo ""

  while IFS= read -r line; do
    FILE=$(echo "$line" | cut -d: -f1)
    LINE_NUM=$(echo "$line" | cut -d: -f2)
    CONTENT=$(echo "$line" | cut -d: -f3-)

    # Extract pixel value
    PIXEL_VALUE=$(echo "$CONTENT" | grep -oE "[0-9]+" | head -1)
    SUGGESTED_TOKEN=$(suggest_token "$PIXEL_VALUE")

    echo "  ${BLUE}${FILE}:${LINE_NUM}${NC}"
    echo "    ${CONTENT}"
    echo "    ${GREEN}→ Suggested: ${SUGGESTED_TOKEN}${NC}"
    echo ""
  done < "$GAP_FILE"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${YELLOW}📝 NEXT STEPS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Review violations above"
echo "2. Replace hardcoded values with ArenaSpacing tokens"
echo "3. Add ${BLUE}// @spacing-exception${NC} comment for legitimate exceptions"
echo "4. Run ${BLUE}npm run lint:fix${NC} for auto-fixable violations"
echo "5. Re-run ${BLUE}./scripts/audit-spacing.sh${NC} to verify"
echo ""
echo "${YELLOW}💡 TIP:${NC} Import ArenaSpacing from '@/constants'"
echo ""

# Export detailed report to file
REPORT_FILE="spacing-audit-report-$(date +%Y%m%d-%H%M%S).txt"
{
  echo "Arena Spacing Audit Report"
  echo "Generated: $(date)"
  echo ""
  echo "Total Violations: $TOTAL_VIOLATIONS"
  echo "  - Margin: $MARGIN_VIOLATIONS"
  echo "  - Padding: $PADDING_VIOLATIONS"
  echo "  - Gap: $GAP_VIOLATIONS"
  echo ""
  echo "=== MARGIN VIOLATIONS ==="
  cat "$MARGIN_FILE"
  echo ""
  echo "=== PADDING VIOLATIONS ==="
  cat "$PADDING_FILE"
  echo ""
  echo "=== GAP VIOLATIONS ==="
  cat "$GAP_FILE"
} > "$REPORT_FILE"

echo "${GREEN}📄 Detailed report saved: ${REPORT_FILE}${NC}"
echo ""

# Cleanup
rm "$MARGIN_FILE" "$PADDING_FILE" "$GAP_FILE"

exit 1
